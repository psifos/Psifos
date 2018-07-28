import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';

import Layout from '../../../components/Layout/Layout';
import Elections from '../../../components/Elections/Elections'

class CommunityPage extends React.Component {

  render() {
    return (
      <Layout>
        <Elections/>
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(CommunityPage);