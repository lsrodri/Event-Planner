eventPlannerApp.factory('firebaseService', function($firebaseObject, $firebaseArray) {
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAQmXz8Ehr5THimTgt2RRh2DsA0a0olAto",
      authDomain: "events-394dd.firebaseapp.com",
      databaseURL: "https://events-394dd.firebaseio.com",
      storageBucket: "events-394dd.appspot.com",
      messagingSenderId: "1034358825975",
      projectId: "events-394dd"
    };

    firebase.initializeApp(config);

    return {
        getRef: function(){
            //Database name: events
            //Getting only the events created by the user using uid
            var ref = firebase.database()
                .ref("events")
                .child(firebase.auth().currentUser.uid);
            return ref;
        },
        getEvents: function(){
            //Database name: events
            var ref = firebase.database().ref("events");
            var uid = firebase.auth().currentUser.uid;
            //Getting only the events created by the user using uid
            return $firebaseObject(ref.child(uid));
        },
        checkAuth: function(callback){
            //Checking on authentication
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //Getting user's list of events
                    callback();
                }
            });
        },
        checkBeforeAdding: function(id) {
            //Database name: events
            //Getting this uid already has an event with the same id
            var ref = firebase.database().ref("events")
                        .child(firebase.auth().currentUser.uid)
                        .orderByChild("eventId")
                        .equalTo(id);
            return ref;
        },
        addEvent: function(id,name,datetime,image, callback){
            this.checkBeforeAdding(id).once('value').then(function(data){
                var unique = false;

                //will return true only if item with the same id was not found
                if(data.val() === null) {
                    unique = true;
                }

                callback(unique);
            });
        },
        fbLogin: function(){
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
});