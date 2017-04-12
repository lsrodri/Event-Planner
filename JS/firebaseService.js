eventPlannerApp.factory('firebaseService', function($firebaseObject, $firebaseArray) {
    return {
        getRef: function(){
            //Database name: events
            var ref = firebase.database().ref("events/" + firebase.auth().currentUser.uid);
            //Getting only the events created by the user using uid
            return ref;
        },
        getEvents: function(){
            //Database name: events
            var ref = firebase.database().ref("events");
            var uid = firebase.auth().currentUser.uid;
            //Getting only the events created by the user using uid
            return $firebaseObject(ref.child(uid));
        }   
    }
});