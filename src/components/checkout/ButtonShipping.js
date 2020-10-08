import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
// import Price from '../Price';


export default function BtnShipping({shipping, shop, handleClick}) {

    return (
        <Grid container className="space__between">
            <Button variant="outlined" color="primary" onClick={handleClick}>
                {shipping.map((curItem) => {
                    if(curItem.id===shop){
                        return curItem.service;
                    }
                  }, 'Pilih')}
            </Button>
            <Typography variant="subtitle2" gutterBottom>
                {/* <Price 
                    value={shipping.map((curItem) => {
                        if(curItem.id==shop){
                            if(curItem.price<=0){
                                return 1;
                            }else{
                                return curItem.price;
                            }
                        }
                    }, 1)}
                ></Price> */}
                Rp{shipping.map((curItem) => {
                        if(curItem.id===shop){
                            if(curItem.price<=0){
                                return 1;
                            }else{
                                return curItem.price;
                            }
                        }
                    }, 1)}
            </Typography>
        </Grid>

    );
}