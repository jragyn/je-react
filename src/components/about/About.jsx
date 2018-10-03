// react components
import React from 'react';
// material-ui components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// personal components
import ProfileImage from './About_ProfileImage';
import SkillChips from './About_Skills';
import WorkStory from './About_WorkStory';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 600,
    float: "left"
  },
  btn: {
    width: 360,
  }
};

export default class AboutCard extends React.Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardContent>
          <Typography variant="display1" color="primary" align="center">
              Who is JE?
          </Typography>
          <Typography variant="caption" align="center" gutterBottom>
            Jeremy Espinoza, born and raised in the Greater Seattle Area.
          </Typography>
          <ProfileImage />
          <Typography variant="subheading" align="center" gutterBottom>
            <Button 
              href="https://www.bellevuecollege.edu/programs/degrees/bachelor/ist/ad/" target="_blank"
              variant="outlined" color="primary"
              style={styles.btn}>
                Current student at Bellevue College.
            </Button>
          </Typography>
          <Typography variant="subheading" align="center" gutterBottom>
            <Button 
                href="https://www.linkedin.com/in/jeremyespinoza" target="_blank"
                variant="outlined" color="secondary"
                style={styles.btn}>
                  Aspiring Web or Software Developer.
            </Button>
          </Typography>
          <Typography variant="subheading" align="center" gutterBottom>
            <Button 
                href="/je-react/Rmmv"
                variant="outlined"
                style={styles.btn}>
                  A gamer at heart.
            </Button>
            
          </Typography>
          </CardContent>
        </Card>
        <SkillChips />
        <WorkStory />
      </div>
    );
  }
}