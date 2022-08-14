import React, { Component } from 'react';
import OrderItem from '../OrderItem';

class OrderList extends Component {
    constructor(props)
    {
        super(props);
        this.state={data:[]};
    }
    componentDidMount()
    {
        fetch("/mock/orders.json").then((res)=>
        {
            if(res.ok)
            {
                res.json().then((data)=>
                {
                    this.setState({
                        data,
                    });
                });
            }
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.data.map((item)=>
                    {
                        return(
                            <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />
                        );
                    })
                }
            </div>
        );
    }
    handleSubmit=(id,comment)=>
    {
        const newData=this.state.data.map((item)=>
        {
            return item.id===id ?
            {
                ...item,
                comment,
                ifCommented:true,
            }
            : item;
        });
        this.setState({
            date: newData,
        });
    }
}

export default OrderList;