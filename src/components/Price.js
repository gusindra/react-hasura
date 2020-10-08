import React from 'react';

export default function Price({ value }) {
    function currencyFormat(num) {
        var amount = Number(num);
        if(amount>0){
            return amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }else{
            return 0;
        }
     }
    return (
        <React.Fragment>
            {<strong>Rp{currencyFormat(value)}</strong>}
        </React.Fragment>
    );
}