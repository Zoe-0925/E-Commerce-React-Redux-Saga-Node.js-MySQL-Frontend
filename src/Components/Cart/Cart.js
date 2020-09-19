import React, { Fragment } from 'react';
import { useSelector } from "react-redux"
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import CartItem from './CartItem';
import Paypal from '../Payment/Paypal';
import { selectTotal, selectProductsInCart } from "../Selectors"
import history from '../../history';

export default function Cart({ showButton }) {
    const totalFromState = useSelector(selectTotal)
    const items = useSelector(selectProductsInCart)

    const handleCheckOut = (totalFromState) => {
        if (totalFromState > 0) {
            history.push("/checkoutInfo");
        }
    }

    const shipping = totalFromState >= 99 ? 0 : 10;

    return (
        (items !== undefined && items.length > 0) ?
            <Fragment>
                <Grid container
                    direction="column"
                    justify="center"
                >
                    <Grid item style={{ paddingBlockStart: "3px" }} key="product-in-cart">
                        {items ? items.map(each => {
                            return (<CartItem item={each} key={uuidv4()} />)
                        }) : []}
                    </Grid>
                    <br />  <br />
                    <Grid container
                        direction="row"
                        justify="center">
                        <Grid item xs={2} key="3">SUBTOTAL</Grid>
                        <Grid item xs={7} key="4"></Grid>
                        <Grid item xs={3} key="5">
                            ${totalFromState}.00<br /><br />
                        </Grid>

                    </Grid>
                </Grid>
                <Grid container
                    direction="column"
                    justify="center"
                    style={{ textAlign: "center" }}
                    spacing={2}
                >
                    {shipping == 0 && <Grid item key="1">SHIPPING CALCULATED AT <br />CHECKOUT<br />
                    </Grid>}
                    {shipping > 0 &&
                        <div>
                            <Grid container
                                direction="row"
                                justify="center">
                                <Grid item xs={2} key="3">SHIPPING</Grid>
                                <Grid item xs={7} key="4"></Grid>
                                <Grid item xs={3} key="5">
                                    ${shipping}.00<br /><br />
                                </Grid>
                            </Grid>
                            <Grid container
                                direction="row"
                                justify="center">
                                <Grid item xs={2} key="3">TOTAL</Grid>
                                <Grid item xs={7} key="4"></Grid>
                                <Grid item xs={3} key="5">
                                    ${shipping + totalFromState}.00<br /><br />
                                </Grid>
                            </Grid>
                        </div>
                    }
                    <Grid item key="2">
                        {showButton && <Button style={{ width: 260 }} onClick={handleCheckOut}>Check Out→</Button>}
                        <br />
                    </Grid>
                    <Grid item key="3">
                        {totalFromState > 0 && <Paypal style={{ width: "100%", }} total={totalFromState} />}
                        <br />
                    </Grid>
                </Grid>
            </Fragment> : <p style={{ textAlign: "center", }} pl={1}>YOUR BAG IS CURRENTLY EMPTY.</p>
    );
}