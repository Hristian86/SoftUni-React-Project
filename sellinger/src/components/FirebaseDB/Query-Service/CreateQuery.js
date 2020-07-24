import React,{Component} from 'react'
import fire from '../../FirebaseAuth/Config';
import Model from '../Models/PostModel';

export default class CreateQuery extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }



    Create = (dataRef,subject,phone,content,image,price,city,address,uid) => {
        const currUser = fire.auth().currentUser;
        const userId = currUser.uid;
        if (currUser) {

            try {

                let model = Model(content,currUser,subject,image,phone,currUser,price,city,address,uid);
                console.log(model);
                
                const firestore = fire.firestore();
                firestore.collection(dataRef).add(model)
                    .then(() => {
                        console.log('Created');
                    }).catch((err) => console.log(err));

                    return "Success";
            } catch (e) {
                console.log(e);
            }
        }
    }

    AddPictures = (image1, image2, image3,id) =>{
        const currUser = fire.auth().currentUser;
        const userId = currUser.uid;
        if (currUser) {
            const dataReference = 'images';
            try {
                
                    let payload1 = {
                        "id": id,
                        "userId": userId,
                        "image": image1
                    }
                    
                    const firestore = fire.firestore();
                    firestore.collection(dataReference).add(payload1)
                    .then(() => {
                        console.log('Created');
                    }).catch((err) => console.log(err));
                    
                    
                    let payload2 = {
                        "id": id,
                        "userId": userId,
                        "image": image2
                    }
                    
                    firestore.collection(dataReference).add(payload2)
                    .then(() => {
                        console.log('Created');
                    }).catch((err) => console.log(err));

                    
                    let payload3 = {
                        "id": id,
                        "userId": userId,
                        "image": image3
                    }
                    
                    firestore.collection(dataReference).add(payload3)
                    .then(() => {
                        console.log('Created');
                    }).catch((err) => console.log(err));
                
                    return "Success";
            } catch (e) {
                console.log(e);
            }
        } else {
            return "Not logged"
        }
    }
}