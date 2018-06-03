import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import VGIcon from '@material-ui/icons/VideogameAsset';
import CodeIcon from '@material-ui/icons/Code';

const styles = {
  card: {
    minWidth: 275,
    margin: 10,
    padding: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '30%',
    border: '1px solid black'
  },
  innerCard: {
    margin: 10,
    padding: 10,
  }
};

const plugins = {
  "Base": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_Base.js",
    pic: 'base.png',
    sub: "Required for most all my plugins starting with 'J_'.",
    desc: "This plugin is the base that primarily just does a lot of the note-reading and " +
          "icon assignment for other plugins I've written. Additionally, it also adds icons " +
          "for all selectables throughout the menu scene (including it's child scenes, like " +
          "the status/item/equip/skill menus).",
  },
  "CritDamage": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_CritDamage.js",
    pic: 'cdm.png',
    sub: "Enables crit damage modifiers.",
    desc: "By default, RMMV lacks true control over any details beyond the black and white: " +
          "is it a crit, or is it not? This plugin expands on that a bit by allowing various " +
          "actors/enemies + classes/equipment/states to modify damage dealt when a critical hit " +
          "is landed, both up or down. See plugin for details on usage.",
  },
  "Difficulty": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_Difficulty.js",
    pic: 'diff.png',
    sub: "Emulates a 'difficulty' settings menu.",
    desc: "This plugin creates a 'difficulty system' for the game, by multiplying enemy " + 
          "parameters by a percent. Using this, you can create an 'easy' or 'hard' mode " +
          "for your game! Effects are instant, though any already-created enemies (in the " + 
          "instance you're using an ABS) may not be affected. Difficulties can be created " +
          "dynamically, though it is recommended you just jump into the plugin in your " +
          "favorite code editor and manually add the value if you want more than my three " +
          "defaults of easy/normal/hard, or want to change up the numbers at all to " +
          "accommodate your formulai.",
  },
  "DropItem": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_DropItem.js",
    pic: 'drops.png',
    sub: "Changes drop rates to % in database.",
    desc: "Item drops by nature are configured in the RMMV Database by using 1/N chance. " +
          "Trying to calculate that can make it a bit tough, and so to accommodate this, " +
          "we have this plugin, which will enable the dev to write in numbers in the " +
          "normally-N-field of the database, and it will be translated into a flat % instead. " +
          "Second, this plugin also allows the dev to choose a 1000-scale instead of 100-scale " +
          "for enemy drop %s, to allow for more precise drop rates if needed. Lastly, the dev " +
          "can also now use the notes box to write in drops beyond the default 3 available.",
  },
  "Elementalistics": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_Elementalistics.js",
    pic: '_dummy.png',
    sub: "Allows modification of elemental potency.",
    desc: "By using simple notes box tags, you can provide elemental damage modification " +
          "to actor/class/equips/states, and effectively increase/decrease elemental damage " +
          "dealt to enemies. This is not to be confused for the concept of reducing damage " +
          "from enemies as the RMMV database already has. Note: enemies cannot benefit from " +
          "this feature.",
  },
  "HUD": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_HUD.js",
    pic: 'hud.png',
    sub: "A generic HUD overlay on the map.",
    desc: "The various plugin creators have developed many HUD plugins since it's release, " +
          "but this is my take on the HUD. As seen in the preview image above, this HUD shows " +
          "the leader-actor's face portrait, their HP/MP/TP bars, and an experience bar. That's " +
          "it. It was mainly designed for use with an ABS system, but it will work without if you " +
          "want the player to know this information on the map.",
  },
  "HUD_Time": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_HUD_Time.js",
    pic: 'hud_time.png',
    sub: "A small add-on to HUD for realtime in-game.",
    desc: "There are a variety of reasons to have this, but it is simply a real-time clock " +
          "that reaches out and grabs your computer time, and displays it in the upper right.",
  },
  "MapTime": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_MapTime.js",
    pic: '_dummy.png',
    sub: "Provides control over status-time effects on the map.",
    desc: "Normally, HRG/MRG/TRG and the various DOTs like 'poison' don't work very well " +
          "(or at all in some cases), and this plugin addresses that. It applies a formula " +
          "to recover HP via HRG, MP via MRG, and TP via TRG that makes use of these stats " +
          "outside of battle. Now, in a typical turn-based RPG, this probably isn't ideal, but " +
          "in an ABS, this works great! Also, it is worth it to note that in this plugin's case, " +
          "TP has effectively been converted to 'stamina' of sorts, and is consumed on running. " +
          "Though this can be disabled, it was a feature I used in my project, and left it here in " +
          "case others thought it useful.",
  },
  "ParamLimit": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_ParamLimit.js",
    pic: 'parlim.png',
    sub: "Expands (or reduces) stat limits.",
    desc: "Many plugins handle this functionality well enough, but this is my rendition of " +
          "putting a cap on the player's various parameters, like HP/MP/ATK/etc. It allows " +
          "the dev to prevent the given parameters from going above a certain value.",
  },
  "RecordWindow": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_RecordWindow.js",
    pic: 'rw.png',
    sub: "Creates a window to track ABS information.",
    desc: "Designed for use with an ABS, this tracks various bits of real-time information " +
          "such as experience gained, gold found, or items collected. This is a fairly crude " +
          "piece of work, but it does work.",
  },
  "revamp_EquipScreen": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_revamp_equipscreen.js",
    pic: 'reequip.png',
    sub: "A remodel of the equip scene/screen.",
    desc: "The equip scene by default was pretty unexciting, and was missing a ton of " +
          "potentially useful information, basically two full sets of stats that were " +
          "modifiable, but not visible (such as critical hit rate). To accommodate this, " +
          "I redrafted up the equip scene to include this information. There are a single  " +
          "catch though: it was designed with 1280x720 resolution, so you'll " +
          "need to figure out a way to get your resolution higher than that (cough cough " +
          "YANFLY CORE ENGINE cough). Also, it does require the J_Base.js plugin to work, " +
          "mostly for drawing icons and such.",
  },
  "revamp_StatusScreen": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_revamp_statusscreen.js",
    pic: 'restatus.png',
    sub: "A remodel of the status scene/screen.",
    desc: "Similar to the equip scene, the status scene also lacked a huge amount of potentially " +
          "useful information, and so I redesigned it, and also added the ability to select stats " +
          "and view a small description of what they do (learn the difference between TCR and TRG!) " +
          "However, similar to the my redesign of the equip scene, the status scene also requires " +
          "both the J_Base.js, AND the resolution, and has a caveat of it's own: it was designed to " +
          "work with explicitly 10 elements. Add more or less, and it might do strange things.",
  },
  "XPGPvariance": {
    url: "https://raw.githubusercontent.com/jragyn/RMMV/master/plugins/J_XPGPvariance.js",
    pic: '_dummy.png',
    sub: "Gives greater control over EXP/GP gains.",
    desc: "Though I'm sure many players love the idea of just grinding out a huge amount " +
          "enemies and powerleveling their way to victory instead of using some sort of " +
          "strategy the dev wants you to try and make use of, this plugin was designed to " +
          "basically address just that: enemies will give less and less EXP as the level " +
          "gap grows between the leader and the enemies. Inversely, if the enemy is much " +
          "higher than the player, it will give much more experience. This is all managed " +
          "via notetags in the enemy's box to determine levels along with a bit of math. " +
          "Also, in addition to this, you can now add a variance of a few gold to enemies " +
          "to mix it up a bit. Note: This was all drafted up for use with an ABS, though " +
          "should work with a standard turn-based system, too.",
  },
};

class RmmvPlugins extends React.Component {

  componentDidMount() {
    this.makePluginCards();
  }

  componentWillUnmount() {
    // unsubscribe here, if needed.
  }

  makePluginCards = () => {
    var keyCounter = 0;
    var reactPlugins = [];
    for(var key in plugins) {
      reactPlugins.push(
        <Card style={styles.innerCard} key={keyCounter}>
          <CardMedia 
            image={require('../rmmvShots/' + plugins[key].pic)} 
            title="cover image" 
            style={styles.media}
          />
          <CardContent>
            <Typography variant="headline">
              {key}
            </Typography>
            <Typography variant="caption">
              TL;DR: {plugins[key].sub}
            </Typography>
            <Typography variant="subheading">
              {plugins[key].desc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="primary" href={plugins[key].url} target="_blank">
              <CodeIcon /> Code
            </Button>
          </CardActions>
        </Card>
      );
      keyCounter++;
    }
    ReactDOM.render(reactPlugins, document.getElementById('pluginOutput'));
  }

  render() {
    return (
      <div>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="body1" color="default" gutterBottom>
                This is a list of plugins I've created for use with RPG Maker MV. Many of
                them are designed to work in tandem with an ABS of some kind, like Q's, 
                and also all should require the J_Base.js (listed first) to operate as intended.
                If you use RMMV, feel free to take and use these as you like! If you opt to 
                refactor or improve any of them in some way, I'm always interested in leveling up
                my coding-for-RMMV skills!
              </Typography>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<VGIcon />}>
                  <Typography variant="body1" color="primary">
                    RMMV Plugin List
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div id="pluginOutput" />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </CardContent>
          </Card>
      </div>
    );
  }

}

RmmvPlugins.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RmmvPlugins);