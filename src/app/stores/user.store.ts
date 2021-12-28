import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, DocumentSnapshot, QuerySnapshot } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { action, computed, observable } from "mobx";
import { distinct, Observable, of, Subscription} from "rxjs";
import { IUser } from "../interface/IUser.model";
import { pushToArray, pushToObject } from "../services/data-manipulation.service";
import { DataService } from "../services/data.service";
import { ObjectDataMappingService } from "../services/object-data-mapping.service";

@Injectable({
  providedIn: 'root'
})

export class UserStore {
  @observable loading: boolean = false;
  @observable fetching: boolean = false;
  @observable processing: boolean = false;


  @observable data: any = null;
  @observable arrData: Array<any> = [];

  @observable user: IUser | undefined;
  @observable currentUser: any;
  @observable process : boolean =false;

  item: Observable<any> | undefined;
  items$: Observable<any[]> | undefined;
  @observable fetchListingRef: Subscription | undefined;

  //private itemDoc: AngularFirestoreDocument<any> | undefined;

  private getUsersSubscription: Subscription | undefined;
  infinite: Observable<any> | undefined;

  constructor(
    private afs: AngularFirestore,
    private ds: DataService,
    private auth: AngularFireAuth,
    private router: Router,
    private objectDataMappingService: ObjectDataMappingService
  ) { }

  @computed
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('SessionUser');
    return user != null ? true : false;
  }

  @action
  async getUsers() {
    this.loading = true;
    this.getUsersSubscription = this.afs.collection('newuser', ref => ref.where('isDeleted', '==', false)).valueChanges().subscribe((result) => {
      this.arrData = result;
      console.log(this.arrData);
      this.loading = false;
    });
  }

  @action
  async getUsersCallback(uid: string, callback: (isSucess: boolean, result: any) => void) {
    try {

      this.loading = true;
      this.user = pushToObject(await this.ds.userRef().doc(uid).get().toPromise() as DocumentSnapshot<DocumentData>) as IUser;
      this.loading = false;
      callback(true, this.user);

    } catch (error) {
      console.log('getUserCallback Error: ', error);
      this.loading = false;
      callback(true, []);
    }
  }


  @action
  async getUsersAsyncAwait(): Promise<any[]> {
    try {
      this.loading = true;
      this.arrData = pushToArray(await this.afs.collection('users', ref => ref.where('isDeleted', '==', false)).get().toPromise() as QuerySnapshot<DocumentData>);
      this.loading = false;
      return this.arrData;
    } catch (error){
      console.log(error);
      return [];
    };
  }

  @action
  async unsubcribe() {
    if(this.getUsersSubscription) this.getUsersSubscription.unsubscribe();
  }

  @action
  async addItem(data: IUser) {
    try {
      await this.afs.collection('users').doc(data.key).set(data);
      console.log('success')
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async addUsers(data: IUser) {
    try {
      await this.afs.collection('newuser').doc(data.key).set(data);
      console.log('success')
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async updateItem(item: any, callback: any) {
    try {
      this.process=true;
      await this.ds.userRefs().doc(item.key).update(item).then(() => {
        this.process = false;
        callback(true, item.key);
      })
    } catch (error) {
      //console.log('UpdateUser Error: ', error);
      this.process = false;
      callback(false, error);
    }
  }

  @action
   async deleteItem(userData: IUser, callback: any) {
    try {
      this.process = true;
      await this.ds.userRefs().doc(userData.key).delete().then(() => {
        this.process = false;
        callback(true, userData);
      })
    } catch (error) {
      this.process = false;
      callback(false, error);
    }
  }

  @action
  async signIn(email: string, password: string) {
    try {
      this.loading = true;
      this.auth.signInWithEmailAndPassword(email, password).then(async (value: any) => {

        const uid = value.user.uid;
        this.getUsersCallback(uid, (isSuccess: boolean, userData: IUser) => {
          if(!isSuccess) {this.loading=false; return;}
          if(userData.isPublished) {
            localStorage.setItem('SessionUser', JSON.stringify(this.objectDataMappingService.mapUserData(userData)));
            //this.router.navigate(['/home-page']);
            this.loading = false;
          } else {
            //this.signOut();
          }
        })
      }).catch((err) => {
        alert('Invalid Email and Password');
        this.loading = false;
      });

    } catch (error) {
      console.log('signIn error: ', error);
      this.loading = false;
    }
  }

  @action
  async signOut() {
    try {

      this.loading = true;
      this.auth.signOut().then(() => {
        this.user = undefined;
        this.currentUser = undefined;
        localStorage.removeItem('SessionUser');
        this.router.navigate(['/login']);

      // this.loading = true;
      // this.auth.signOut().then(() => {
      //   this.user = undefined;
      //   this.currentUser = undefined;
      //   localStorage.removeItem('SessionUser');
        //this.router.navigate(['/login']);
      });

    } catch (error) {
      console.log('signOut error: ', error);
      this.loading = false;
    }
  }

  @action
  async registerUser(email: string, password: string) {
    try {
      const credentialData = await this.auth.createUserWithEmailAndPassword(email, password);
      // this.sendVerificationMail();
      return credentialData.user;
    } catch (error) {
      console.log('registerUser Error: ', error);
    }
    return;
  }

  lastVisible: any = null;

  @observable public orderBy = null;
  @observable public searchText = null;
  @observable public filter = null;

  infiniteData(data: any) {
    this.infinite = of(data).pipe(distinct((p:any) => p.key));
    //console.log('infinite: ', this.infinite);

  }

  @action
  async fetchData(search: any, filter: any, orderBy: any) {
    this.orderBy = orderBy;
    this.searchText = search;
    this.filter = filter;
    this.loading = true;
    this.fetching = false;
    this.lastVisible = null;

    const ref = this.lazyDataRef(this.lastVisible, search, filter, orderBy);

    this.fetchListingRef = ref.snapshotChanges().subscribe((response: any) => {
      this.data = [];

      if (!response || response.length === 0) {
        this.loading = false;
        this.fetching = false;
        return false;
      }

      this.lastVisible = response[response.length - 1].payload.doc;

      for (let item of response) {
       const value = this.data.push(item.payload.doc.data() as any);
      }

      this.data = this.data.map((f: any, index: number) => ({
        ...f,
        rowIndex: index + 1
      }));

      console.log(this.data)

      const abc = this.infiniteData(this.data);

      this.loading = false
      this.fetching = false;

      return true;
    }, (error: any) => {
      console.log('error', error);
      this.loading = false;
    });
  }

  lazyDataRef(lastVisible: any, search: any, filter: any, orderBy: any) {
    return this.afs.collection<any>("newuser", ref => {
      let condition = ref.limit(20);
      if(search) condition = condition.where('keywords', 'array-contains', search);
      if(lastVisible) condition = condition.startAfter(lastVisible);
     return condition;
    })
  }
}
