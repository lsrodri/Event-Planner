eventPlannerApp.factory('firebaseService', function($firebaseObject, $firebaseArray) {
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
        checkBeforeAdding: function(id) {
            //Database name: events
            //Getting this uid already has an event with the same id
            var ref = firebase.database().ref("events")
                        .child(firebase.auth().currentUser.uid)
                        .orderByChild("eventId")
                        .equalTo(id);
            return ref;
        }   
    }
});