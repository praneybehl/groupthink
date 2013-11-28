Meteor.subscribe('topics');

Meteor.subscribe('usersDirectory');
Meteor.subscribe('userProfile', Meteor.userId(), function(){
  if(Meteor.userId()){
    user = Meteor.users.findOne(Meteor.userId());
    Session.set('forum_topic_id', user.profile.currentTopic);
  }
});


Meteor.autorun(function(){
  Meteor.subscribe('posts', Session.get('forum_topic_id'));
});


settingsId = null;
Meteor.subscribe('settings', function(){
  Session.set('settingsLoaded', true);
  configFile = Settings.find().fetch()[0];

  console.log(configFile);

  Session.set('systemConfigs', configFile);
  Session.set('siteName', configFile.name);
  Session.set('landingImage', configFile.landingImage);

  settingsId = Session.get('systemConfigs')._id;

  displayForkMeBanner(Session.get('systemConfigs'));
});



forkMeBanner = null;
displayForkMeBanner = function(session){
  if(session.forkme){
    forkMeBanner = new ForkMe({
      user: 'awatson1978',
      repo: 'groupthink',
      ribbon: {
        color: 'orange',
        position: 'right'
      }
    });
  }
};



