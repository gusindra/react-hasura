import * as React from 'react';
import Skeleton from '@yisheng90/react-loading';
import Grid from '@material-ui/core/Grid';

export default function CustomLoadingOverlayGrid({type}) {
  if(type=='product'){
    return (
        <React.Fragment>
          <Grid item xs={6} sm={6} md={4}>
            <Skeleton translucent row={5} rows={6} height={150} width="100%" color="pink" ></Skeleton>
          </Grid>
          <Grid item xs={6} sm={6} md={4}>
            <Skeleton translucent row={5} rows={6} height={150} width="100%" color="pink"></Skeleton>
          </Grid>
        </React.Fragment>
    );
  }else if(type=='input'){
    return (
      <React.Fragment>
          <Skeleton translucent height={50} width="100%" color="pink" ></Skeleton>
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton translucent row={5} rows={6} height={150} width="100%" color="pink" ></Skeleton>
        </Grid>
      </React.Fragment>
    );
  }
}
