import React, { useEffect, useState } from 'react';
import { Input, Table } from 'semantic-ui-react';

const StockTable = ({ update, setUpdate, stockData, setStockData, loading, setLoading }) => {
    // should get new id of the stock

    useEffect(() => {
        console.log("render");
        const get_stocks_request = {
            method: 'GET',
        };
        fetch('/stocks', get_stocks_request).then(res => res.json()).then(data => { setStockData(data) });
    }, []);

    console.log(update);
    useEffect(() => {
        if (update) {
            console.log("RErender");
            const get_stocks_request = {
                method: 'GET',
            };
            console.log("fetching");
            fetch('/stocks', get_stocks_request).then(res => res.json()).then(data => {
                setStockData(data);
                setLoading(false);
                setUpdate(false);
            });
            // await fetch('/stocks', get_stocks_request).then(res => res.json()).then(data => { setStockData(data) });
            // setUpdate(false);
            // setLoading(false);
        }
    }, [update]);

    return (
        < Table celled >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>50 Day Moving Average</Table.HeaderCell>
                    <Table.HeaderCell>200 Day Moving Average</Table.HeaderCell>
                    <Table.HeaderCell>Forward Price to Earnings Ratio</Table.HeaderCell>
                    <Table.HeaderCell>Forward Earnings per Share</Table.HeaderCell>
                    <Table.HeaderCell>Dividend Yield</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {stockData.map(stock => (
                    <Table.Row>
                        <Table.Cell>{stock.symbol}</Table.Cell>
                        <Table.Cell>{stock.price}</Table.Cell>
                        <Table.Cell>{stock.ma50}</Table.Cell>
                        <Table.Cell>{stock.ma200}</Table.Cell>
                        <Table.Cell>{stock.forward_pe}</Table.Cell>
                        <Table.Cell>{stock.forward_eps}</Table.Cell>
                        <Table.Cell>{stock.dividend_yield}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table >
    );
};

export default StockTable;