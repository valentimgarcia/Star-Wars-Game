// The base engine
var engine = require('workshop-engine');

/**
 * ----------- Game Variables -----------
*/
var jediName;  // your Jedi name
var jediAge;  // your Jedi age
var hoursConnected;  // hours connected with the Force
var hoursMirrorCave;   // hours spend in the cave
var forcePower = 0;  // force power gained meditating at the Jedi Temple
var bountyValue = 0;  // starts at 0, if it reaches 100 you get busted and lose the game
var fear = 0;   // starts at 0, if it reaches 100 you join the Dark side and lose the game
var vulnerabilities = 0;  // number of vulnerabilities found
var techniques = 0;   // techniques learned 
var jediKnight = false;  // boolean to indicate if the player has reached Jedi knight level
var jediHitpoints = 30  // your current hitpoints
var sithLordHitpoints = 45  // sith lord hitpoints
var ancientTexts = [
  { chapter: 1, technique: '□Fo□□rc□e L□ea□p□□' },
  { chapter: 2, technique: 'T□ra□□n□□□s□fe□r F□o□rc□e□□' },
  { chapter: 3, technique: 'Fo□□rc□e B□urs□t' },
  { chapter: 4, technique: '□□M□alac□i□a' },
  { chapter: 5, technique: '□Fo□rce□□ We□a□□po□n' }
];
var darkLord = {
  name: 'Darth Tekman',
  hitpoints: 45,
  counterImmune: false
};

/**
 * ------------- Functions ------------
 */
var jediKnightCheck = function() { // if padawan becomes jedi knight
  if (fear > 70) {
    jediKnight = true;
    console.log(' Well done ' + jediName + ' with ' + jediAge + ' years old, you are finnaly a Jedi Knight! Prepare yourself to fight the Sith Lord! \n');
  }  
}

var fearCheck = function() {   // if fear is higher than 100
  if (fear >= 100) {
    console.clear();
    engine.showBanner('  GAME   OVER  ');
    console.log('\n \n  Your fear value was equal or higher than 100. Watch out the next time ... \n');
    engine.quit();
  }
}

var fearMin = function() {   // if fear is smaller than 0 
  if (fear < 0) {
    fear = 0;
  }
}

var forceMin = function() {   // if force power is smaller then 0
  if (forcePower < 0) {
    forcePower = 0;
  }
}

var bountyValueCheck = function() {   // if bounty value is higher than 100
  if (bountyValue >= 100) {
    console.clear();
    engine.showBanner('  BUSTED   ');
    console.log('\n \n  Your bounty value reached 100 and you got caught. Look out for that! \n');
    engine.quit();
  }
} 

var jediVictory = function() {   // if the jedi wins the game
  if (sithLordHitpoints <= 0) {
    console.clear();
    engine.showBanner('      VICTORY   ');
    console.log('\n \n  Well done ' + jediName + ' with ' + jediAge + ' years old, you defeated the Sith Lord! \n  After many years, you finally brought peace to the galaxy and it\'s now a better place then it was. \n');
    engine.quit();
  }
}

var jediLost = function() {   // if the jedi loses the game
  if (jediHitpoints <= 0) {
    console.clear();
    engine.showBanner('             LOST    : ( ');
    console.log('\n \n  Unfortunately the Sith Lord defeated you! \n  The galaxy is now full of dark power ... You should have trained more and prepared better for this battle ' + jediName + '. \n');
    engine.quit();
  }
}

var jediHitpointsMin = function() {   // if  jedi hitpoints become smaller than 0
  if (jediHitpoints < 0) {
    jediHitpoints = 0;
  }
}

var sithLordHitpointsMin = function() {   // if sith lord hitpoints become smaller than 0
  if (sithLordHitpoints < 0) {
    sithLordHitpoints = 0;
  }
}


/**
 * -------------- EVERY STAGE ---------------
 */
var beforeStage = engine.create({
  type: 'before',
  name: 'Game Introduction'
})
var jediTemple = engine.create({
  type: 'stage',
  name: '- Jedi Temple'
})
var cantina = engine.create({
  type: 'stage',
  name: '- Cantina'
})
var ahchTo = engine.create({
  type: 'stage',
  name: '- Ahch-To'
})
var jediTraining = engine.create({
  type: 'stage',
  name: '- Jedi Training'
}) 
var starDestroyer = engine.create({
  type: 'stage',
  name: '- Star Destroyer'
})
var quitGame = engine.create({
  type: 'stage',
  name: '- Quit the Game'
})



/**
 *  ---------- GAME INTRODUCTION ------------
 */

beforeStage.executeBefore(function() {
  engine.showBanner(' Star  Wars   Game   ');
  console.log('');
  console.log('Hey there young fellow member of the Jedi Order, we are happy to see you. Your goal here is to become a Jedi Knight!');
  console.log('To become a Jedi Knight, you must defeat all the enemies to win the game. And in the meanwhile, make sure your bounty value is not exceeded and your fear doesn\'t lead you to the dark side of the force.');
  console.log('');
});


beforeStage.addQuestion({
  type: 'confirm',
  message: 'So without further ado, are you willing to become the next Jedi Knight and make the galaxy a more peaceful place ?',
  action: function(yes) {
    if (yes) {
      console.log('Prepare yourself to become a full member of the Order!');
    } else {
      console.log('');
      console.log('Come back whenever you know it\'s the right time to you ...');
      return engine.quit();
    }
  }
});


beforeStage.addQuestion({
  type: 'input',
  message: 'What\'s going to be your Jedi Name ?',
  validator: function(answer) {
    if (answer.length < 3) {
      return 'Your name must be over or equal to 3 characters.';
    } else if (answer.length > 10) {
      return 'Your name must be shorter than 10 characters.';
    } else if (answer) {
      if (!/^[a-zA-Z]*$/g.test(answer)) {
        return 'Invalid characters! Your name must be from a to z, lower case or upper case.';
      }
    }
  },
  action: function(answer)  {
    jediName = answer;
  } 
});


beforeStage.addQuestion({
  type: 'input',
  message: 'What\'s your Jedi age ?',
  validator: function(age) {
    if (age < 18) {
      return 'You\'re too young for this, come back in a few years.';
    } else if (age > 68) {
      return 'You\'re too old, maybe you should consider your retirement ' + jediName + ' ...';
    } else if (age) {
      if (!/^[0-9]+$/.test(age)) {
        return 'Invalid numbers! Your age must be from 0 to 9.';
      }
    }
  },
  action: function(age) {
    jediAge = age;
    console.log('\n \n');
  }
});

beforeStage.addQuestion({
  type: 'list',
  message: 'Before you start exploring let me show you some rules you must follow:\n  -» Defeat the Sith Lord to win.\n  -» Find vulnerabilities to infiltrate the Star Destroyer.\n  -» Learn force techniques through ancient texts.\n \n Now read this very carefully:\n  -» All of your actions will increase your fear.\n  -» If your bounty value or fear reaches 100, you lose.\n  -» If your fear becomes higher than 70, you are experienced enough and become a Jedi Knight.\n',
  options: ['In the name of the Order, I agree with everything.', 'Why do I have to defeat the Sith Lord myself ? I don\'t think im capable to do it alone ...'],
  action: function(answer) {
    if (answer === 'In the name of the Order, I agree with everything.') {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n Well done ' + jediName + ' with ' + jediAge + ' years old, you have successfully completed the requirements to enter!\n ');
    } else {
      console.log('\n We knew you weren\'t ready enough, get out of here!');
      engine.quit();
    }
  }
});



/**
 * ----------- QUIT THE GAME -----------
 */
quitGame.executeBefore(function() {
  console.clear();
  engine.showBanner(' Quit  ?   : ( ');
  console.log('');
});

quitGame.addQuestion({
  type: 'list',
  message: 'Are you sure you want to leave the game ?',
  options: ['Yes', 'No'],
  action: function(answer) {
    if (answer === 'Yes') {
      console.log('');
      console.log('We hope to see you soon ' + jediName + '!');
      engine.quit();
    } else {
      console.clear();
      return false
    }
  }
});



/**
 * ---------- JEDI TEMPLE ------------
 */
jediTemple.executeBefore(function() {
  console.clear();
  engine.showBanner('  Jedi   Temple  ')
  console.log('\n \n Welcome to the Jedi Temple. Here is where you can attune with the Force. \n');
});

jediTemple.addQuestion({
  type: 'input',
  message: 'The more hours you spend, the more force power you will obtain.\n  Fear affects the attunement. If the fear value is high, you will obtain less force power. \n \n How many hours do you want to be connected with the Force ?',
  validator: function(hours) {
    if (hours < 1) {
      return 'You need to be connected at least one hour to the Force.';
    } else if (hours > 24) {
      return 'You can\'t obtain power for more than one straight day in a row!';
    } else if (hours) {
      if (!/^[0-9]+$/.test(hours)) {
        return 'Invalid numbers! The hours you want to spend, must be from 0 to 9.';
      }
    }
  },
  action: function(hours) {
    hoursConnected = hours;
    if (hours > 0 && hours <= 6) {
      if (fear < 55) {
        forcePower = forcePower + 7;
        fear = fear + 12;
      } else if (fear >= 55) {
        forcePower = forcePower + 4; 
        fear = fear + 12;
      }  
    } else if (hours > 6 && hours <= 12) {
      if (fear < 55) {
        forcePower = forcePower + 15;
        fear = fear + 21;
      } else if (fear >= 55) {
        forcePower = forcePower + 11;
        fear = fear + 21;
      }  
    } else if (hours > 12 && hours <= 18) {
      if (fear < 55) {
        forcePower = forcePower + 23;
        fear = fear + 34;  
      } else if (fear >= 55) {
        forcePower = forcePower + 17;
        fear = fear + 34;
      }  
    } else if (hours > 18 && hours <= 24) {
      if (fear < 55) {
        forcePower = forcePower + 32;
        fear = fear + 43;
      } else if (fear >= 55) {
        forcePower = forcePower + 26;
        fear = fear + 43;
      } 
    }
  }  
});

jediTemple.executeAfter(function() {
  console.clear();
  engine.showBanner('    GAME    LOBBY  ');
  if (fear >= 55) {
    console.log('\n \n- You spent ' + hoursConnected + ' hours connected with the Force, and you obtained ' + forcePower + ' force power.');
    console.log('- Look out for your fear value ' + jediName + ' ! Right now it is ' + fear + '.\n');
    jediKnightCheck();
  } else if (fear < 55) {
    console.log('\n \n- ' + jediName + ' you spent ' + hoursConnected + ' hours connected with the Force, and you obtained ' + forcePower + ' force power.');
    console.log('- Also don\'t forget about your fear value. Right now it is ' + fear + '.\n');
  }
  fearCheck();
});



/**
 * ------------ CANTINA -------------
 */
cantina.executeBefore(function() {
  console.clear();
  engine.showBanner('   Cantina  ')
  console.log('\n You entered the Cantina. Here you can have some drinks, chat, play some cards, but more importantly than that, is the best place to get some intel. \n \n You can use your Jedi mind trick to decrease your bounty value, but using them costs some amount of your force power. \n Also, searching for vulnerabilities to infiltrate the Star Destroyer, will increase your bounty value and if your fear value is high, the number of vulnerabilities found will be lower. \n \n');
});

cantina.addQuestion({
  type: 'list',
  message: 'Look around. You can see some friends and find some intel, what do you want to do ? \n',
  options: [' -Have a drink with the Commander Khoan Berik',' -Perform a Jedi mind trick ability', ' -Find vulnerabilities', ' -Play some cards'],
  action: function(question) {
    if (question === ' -Have a drink with the Commander Khoan Berik') {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n \n It\'s been a long time since you didn\'t talk to the Commander, great chat. \n');
    } else if (question === ' -Perform a Jedi mind trick ability') {
      if (forcePower <= 0) {
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n You must go to the Jedi Temple first and train some hours, then you can come back. \n');
      } else if (forcePower > 0 && forcePower <= 25) {
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n ' + jediName + ' you must have 26 force power to perform a Jedi mind trick. Right now you have ' + forcePower + ' force power. Go back to the Jedi Temple! \n');              
      } else if (forcePower > 25 && forcePower <= 100) {
        if (bountyValue <= 0) {
          console.clear();
          engine.showBanner('    GAME    LOBBY  ');
          console.log('\n \n You didn\'t perform a Jedi mind trick, because your bounty value is 0. Maybe you should do something first ... \n');
        } else if (bountyValue > 0 && bountyValue < 100) {
          forcePower = forcePower - 26;
          bountyValue = bountyValue - 18;
          fear = fear + 18;
          console.clear();
          engine.showBanner('    GAME    LOBBY  ');
          console.log('\n \n You performed a Jedi mind trick and it costed 26 of your force power, now your bounty value is ' + bountyValue + '. \n Also your fear value is ' + fear + '. \n');
          fearCheck();
        } else if (bountyValue >= 100) {
          bountyValueCheck(); 
        }
      }
    } else if (question === ' -Find vulnerabilities') {
      if (fear < 60) {
        vulnerabilities = vulnerabilities + 5;
        bountyValue = bountyValue + 25; 
        fear = fear + 12; 
        jediKnightCheck();
      } else if (fear >= 60) {
        vulnerabilities = vulnerabilities + 3;
        bountyValue = bountyValue + 20;
        fear = fear + 12; 
        jediKnightCheck();
      }  
      if (vulnerabilities < 15) {
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n After some time, you have found ' + vulnerabilities + ' vulnerabilities. \n');
      } else if (vulnerabilities >= 15) {
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n Well done ' + jediName + ', you have found ' + vulnerabilities + ' vulnerabilities. Now you have one of the requirements to enter the Star Destroyer! \n ');  
      } else if (vulnerabilities >= 20) {
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n You have already found all the known vulnerabilities available to enter the Star Destroyer. \n');
        return false;
      }
    } else if (question === ' -Play some cards') {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n \n You played some cards and made some new friends. \n');
    }
  }
});

cantina.executeAfter(function () {
  fearCheck();
  bountyValueCheck();
});



/**
 * ------------ AHCH-TO -------------
 */
ahchTo.executeBefore(function () {
  console.clear();
  engine.showBanner('   Ahch  - To  ');
  console.log('\n Welcome to the Ahch-To. This is the place to face your fears! \n \n The more hours you\'re in the cave, the more your fear decreases. \n But each hour in the mirror cave costs you Force Power. \n \n');
});

ahchTo.addQuestion({
  type: 'input',
  message: ' How many hours do you want to spend in the mirror cave ?',
  validator: function(caveHours) {
    if (caveHours < 1) {
      return 'You need to spend at least 1 hour in the cave.';
    } else if (caveHours > 8) {
      return 'You can only be here for up to 8 hours!';
    } else if (caveHours) {
      if (!/^[0-9]+$/.test(caveHours)) {
        return 'Invalid numbers! The hours you want to spend, must be from 0 to 9.';
      }
    } 
  },
  action: function(caveHours) {
    hoursMirrorCave = caveHours;
    if (fear <= 0) {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n \n Your fear value is ' + fear + '. So you can\'t spend any hours in the mirror cave. \n');
    } else if (forcePower <= 0) {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n \n You don\'t have force power. Go to the Jedi Temple and train some hours. \n');
    } else if (fear > 0 && fear < 100) {
      if (caveHours > 0 && caveHours <= 2) {
        fear = fear - 17;
        forcePower = forcePower - 10;
        fearMin();
        forceMin(); 
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n After being in the mirror cave for ' + hoursMirrorCave + ' hours, your current fear value is ' + fear + '. \n And you have ' + forcePower + ' force power. \n');
      } else if (caveHours > 2 && caveHours <= 4) {
        fear = fear - 28;
        forcePower = forcePower - 16;
        fearMin();
        forceMin();
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n After being in the mirror cave for ' + hoursMirrorCave + ' hours, your current fear value is ' + fear + '. \n And you have ' + forcePower + ' force power. \n');
      } else if (caveHours > 4 && caveHours <= 6) {
        fear = fear - 42;
        forcePower = forcePower - 22;
        fearMin();
        forceMin();
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n After being in the mirror cave for ' + hoursMirrorCave + ' hours, your current fear value is ' + fear + '. \n And you have ' + forcePower + ' force power. \n');
      } else if (caveHours > 6 && caveHours <= 8) {
        fear = fear - 53;
        forcePower = forcePower - 29;
        fearMin();
        forceMin();
        console.clear();
        engine.showBanner('    GAME    LOBBY  ');
        console.log('\n \n After being in the mirror cave for ' + hoursMirrorCave + ' hours, your current fear value is ' + fear + '. \n And you have ' + forcePower + ' force power. \n');
      }
    }  
  }
}); 

ahchTo.executeAfter(function () {
  fearCheck();
  bountyValueCheck();
});



/**
 * ------------ JEDI TRAINING -------------
 */
jediTraining.executeBefore(function () {
  if (fear <= 70) {
    console.clear();
    engine.showBanner('    GAME    LOBBY  ');
    console.log('\n \n ' + jediName + ' you must be a Jedi Knight to enter the Jedi Training. \n You still have a lot to learn before coming here. \n');
    return false;
  } else if (fear > 70) {
    console.clear();
    engine.showBanner('   Jedi   Training   ');
    console.log('\n Well done, you entered the Jedi Training. Here is the place to learn new techniques. \n Before learning any techniques, you must decipher the texts. \n')
  }
});

jediTraining.addQuestion({
  type: 'list',
  message: 'Which ancient text do you want to decipher ? ',
  options: [' ->  □Fo□□rc□e L□ea□p□□', ' ->  T□ra□□n□□□s□fe□r F□o□rc□e□□', ' ->  Fo□□rc□e B□urs□t', ' ->  □□M□alac□i□a', ' ->  □Fo□rce□□ We□a□□po□n'],
  action: function(question) {
    if (question === ' ->  □Fo□□rc□e L□ea□p□□') {
      fear = fear + 12;
      console.log('\n  Preparing yourself ... \n  Reading the text ... \n  Focusing ... \n \n ' + jediName + ' you couldn\'t decipher the text. \n \n');
    } else if (question === ' ->  T□ra□□n□□□s□fe□r F□o□rc□e□□') {
      fear = fear + 12;
      console.log('\n  Looking around ... \n  Seeing the text ... \n  Taking some time ... \n \n Unfortunately you weren\'t able to decipher the text. \n \n');
    } else if (question === ' ->  Fo□□rc□e B□urs□t') {
      fear = fear + 12;
      techniques = techniques + 1;
      console.log('\n  Getting ready ... \n  Compiling deciphered text ... \n  Found some logical ... \n \n Well done! You deciphered the text and learn the Force Burst technique. \n \n');
    } else if (question === ' ->  □□M□alac□i□a') {
      fear = fear + 12;
      console.log('\n  Going to start ... \n  Looking into it ... \n  Trying to read the text ... \n \n You weren\'t able to learn this new technique. \n \n');
    } else if (question === ' ->  □Fo□rce□□ We□a□□po□n') {
      fear = fear + 12;
      techniques = techniques +1;
      console.log('\n  Starting to focus ... \n  Reading precisely ... \n  Finding something ... \n \n Very good! You were able to deciphered the text and learn the Force Weapon technique. \n \n');
    }
    fearCheck();
  }
});

jediTraining.addQuestion({
  type: 'list',
  message: 'Do you want to learn a new technique ?',
  options: [' Of course', ' Not now'],
  action: function(answer) {
    if (answer === ' Of course') {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n \n ' + jediName + ' go back and train some hours, find some vulnerabilities and comeback soon! \n Don\'t forget that you have ' + fear + ' fear! Maybe you should go and lower that ... \n');
      return false;
    } else if (answer === ' Not now') {
      console.clear();
      engine.showBanner('    GAME    LOBBY  ');
      console.log('\n \n ' + jediName + ' comeback when it\'s the right time. \n Don\'t forget that you have ' + fear + ' fear! Maybe you should go and lower that ... \n');
      return false;
    }
  }
});



/**
 * ------------ STAR DESTROYER -------------
 */
starDestroyer.executeBefore(function () {
  if (vulnerabilities < 15) {
    console.clear();
    engine.showBanner('    GAME    LOBBY  ');
    console.log('\n Before you enter the Star Destroyer, you must learn 15 vulnerabilities. After that come back here. \n');
    return false;
  } else if (techniques < 2) {
    console.clear();
    engine.showBanner('    GAME    LOBBY  ');
    console.log('\n ' + jediName + ' you need to learn 2 techniques if you want to fight the Sith Lord! \n');
    return false;
  } else if (vulnerabilities >= 15 && techniques >= 2) {
    console.clear();
    engine.showBanner('    Star   Destroyer  ');
    console.log('\n Finally you entered the Star Destroyer and get face to face with the Sith Lord! \n Before you start the fight read the rules carefully: \n \n  - Each round you fight him you can either Attack or Counter. \n  - Countering the enemy deals double damage to him and you take no damage from his attack. \n  - Trying to counter twice in a row will fail. \n  - A failed counter deals no damage while you still receive damage. \n \n You currently have 30 hit points and the Sith Lord has 45. If you fight smart, peace will be restored again. \n Let the fight begin and may the force be with you! \n \n ');
  }
});

starDestroyer.addQuestion({
  type: 'list',
  message: 'The Sith Lord attacked and you lost 5 hit points. \n What are you going to do ?',
  options: [' Attack',' Counter'],
  action: function(answer) {
    jediHitpoints = jediHitpoints - 5;
    if (answer === ' Attack') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked the Sith Lord and he now has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Counter') {
      if (!darkLord.counterImmune) {
        jediHitpoints = jediHitpoints + 5;
        sithLordHitpoints = sithLordHitpoints - 10;
        darkLord.counterImmune = true;
        console.log('\n You countered the Sith Lord attack and lost no hit points. The Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      }
    }
    jediVictory();
    jediLost();
    jediHitpointsMin();
    sithLordHitpointsMin();
  }
});

starDestroyer.addQuestion({
  type: 'list',
  message: 'Sith Lord used the Lightsaber strike ability and you lost 7 hit points. \n How are you going to fight back ?',
  options: [' Attack',' Counter',' Force Burst',' Force Weapon'],
  action: function(answer) {
    jediHitpoints = jediHitpoints - 7;
    if (answer === ' Attack') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked the Sith Lord and he now has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Counter') {
      if (darkLord.counterImmune) {
        darkLord.counterImmune = false;
        console.log('\n ' + jediName + ' you tried to counter twice in a row. You have ' + jediHitpoints + ' hit points and the Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      } else if (!darkLord.counterImmune) {
        jediHitpoints = jediHitpoints + 8;
        sithLordHitpoints = sithLordHitpoints - 16;
        darkLord.counterImmune = true;
        console.log('\n You countered the Sith Lord attack and lost no hit points. The Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      }
    } else if (answer === ' Force Burst') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Burst technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Force Weapon') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Weapon technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    }
    jediVictory();
    jediLost();
    jediHitpointsMin();
    sithLordHitpointsMin();
  }
});

starDestroyer.addQuestion({
  type: 'list',
  message: 'You received a very powerful attack from the Sith Lord and took you 11 hit points. \n How do you wish to answer ? ',
  options: [' Attack',' Counter',' Force Burst',' Force Weapon'],
  action: function(answer) {
    jediHitpoints = jediHitpoints - 11;
    if (answer === ' Attack') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked the Sith Lord and he now has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Counter') {
      if (darkLord.counterImmune) {
        darkLord.counterImmune = false;
        console.log('\n ' + jediName + ' you tried to counter twice in a row. You have ' + jediHitpoints + ' hit points and the Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      } else if (!darkLord.counterImmune) {
        jediHitpoints = jediHitpoints + 11;
        sithLordHitpoints = sithLordHitpoints - 22;
        darkLord.counterImmune = true;
        console.log('\n You countered the Sith Lord attack and lost no hit points. The Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      }  
    } else if (answer === ' Force Burst') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Burst technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Force Weapon') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Weapon technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    }
    jediVictory();
    jediLost();
    jediHitpointsMin();
    sithLordHitpointsMin();
  }
});

starDestroyer.addQuestion({
  type: 'list',
  message: 'The Sith Lord attacked and took you 9 hit points. \n What\'s going to happen ?',
  options: [' Attack',' Counter',' Force Burst',' Force Weapon'],
  action: function(answer) {
    jediHitpoints = jediHitpoints - 9;
    if (answer === ' Attack') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked the Sith Lord and he now has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Counter') {
      if (darkLord.counterImmune) {
        darkLord.counterImmune = false;
        console.log('\n ' + jediName + ' you tried to counter twice in a row. You have ' + jediHitpoints + ' hit points and the Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      } else if (!darkLord.counterImmune) {
        jediHitpoints = jediHitpoints + 9;
        sithLordHitpoints = sithLordHitpoints - 18;
        darkLord.counterImmune = true;
        console.log('\n You countered the Sith Lord attack and lost no hit points. The Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      }
    } else if (answer === ' Force Burst') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Burst technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Force Weapon') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Weapon technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } 
    jediVictory();
    jediLost();
    jediHitpointsMin();
    sithLordHitpointsMin();
  }
});

starDestroyer.addQuestion({
  type: 'list',
  message: 'The Sith Lord used a special attack and you lost 11 hit points. \n What are you going to do ?',
  options: [' Attack',' Counter',' Force Burst',' Force Weapon'],
  action: function(answer) {
    jediHitpoints = jediHitpoints - 11;
    if (answer === ' Attack') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked the Sith Lord and he now has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Counter') {
      if (darkLord.counterImmune) {
        darkLord.counterImmune = false;
        console.log('\n ' + jediName + ' you tried to counter twice in a row. You have ' + jediHitpoints + ' hit points and the Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      } else if (!darkLord.counterImmune) {
        jediHitpoints = jediHitpoints + 11;
        sithLordHitpoints = sithLordHitpoints - 22;
        darkLord.counterImmune = true;
        console.log('\n You countered the Sith Lord attack and lost no hit points. The Sith Lord has ' + sithLordHitpoints + ' hit points. \n \n');
      }
    } else if (answer === ' Force Burst') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Burst technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } else if (answer === ' Force Weapon') {
      sithLordHitpoints = sithLordHitpoints - 9;
      console.log('\n You attacked with the Force Weapon technique and the Sith Lord has ' + sithLordHitpoints + ' hit points. And you have ' + jediHitpoints + ' hit points. \n \n');
    } 
    jediVictory();
    jediLost();
    jediHitpointsMin();
    sithLordHitpointsMin();
  }
});



/**
 * ------------ GAME RUN -------------
 */
engine.run();