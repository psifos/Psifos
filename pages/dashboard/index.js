import React, { Component } from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import ElectionCard from '../../components/ElectionCard/ElectionCard';

class Dashboard extends Component {
  static async getInitialProps(ctx) {
    const { data: info } = await axios.get(
      'http://localhost:3000/api/users/me',
      {
        headers: {
          Authorization: ctx.authtoken
        }
      }
    );

    const { communityId } = info.user;
    const { data } = await axios.get(
      `http://localhost:3000/api/communities/${communityId}`
    );
    const elections = data.value.Elections;

    return { elections };
  }

  render() {
    return (
      <Layout>
        <Link href="dashboard/elections/add" prefetch>
          <Button icon="add" content="Add new election" primary />
        </Link>
        <Header as="h2">New Elections</Header>
        <Grid columns={1}>
          {this.props.elections.map(election => (
            <Grid.Row key={election.id}>
              <Grid.Column>
                <ElectionCard {...election} />
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </Layout>
    );
  }
}

export default Dashboard;
