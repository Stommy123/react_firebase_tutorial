import React from 'react';
import { SectionWrapper } from '../../components';

export default _ => (
  <SectionWrapper columnDefs="col-md-6 col-md-offset-3 p-t-2" rowDefs="text-xs-center">
    <i className="icn-person material-icons">error</i>
    <p className="lead m-t-2=">You have to be signed in to view this page!</p>
  </SectionWrapper>
);

