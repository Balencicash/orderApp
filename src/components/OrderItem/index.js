import React, { Component } from 'react';
import { Button,Input,Rate } from 'antd';
import './style.css';
import '/node_modules/antd/dist/antd.css';
const { TextArea } = Input;
class OrderItem extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            editing:false,
            rate:props.data.rate || 0,
            comment:props.data.comment || "",
            
        };
    }


    render() {
        const{picture,product,shop,price,ifCommented}=this.props.data;
        const { rate } = this.state;
        return (
            <div className='orderItem'> {/* 商品框架 */}
                <div className='orderItem_picBox'> {/* 图片盒子 */}
                    <img className='orderItem_pic' src={picture}/>
                </div>
                <div className='orderItem_content'> {/* 右边框架 */}
                    <div className='orderItem_Name'>{product}</div> {/* 商品名称 */}
                    <div className='orderItem_shop'>{shop}</div> {/* 店名 */}
                    <div className='orderItem_commentArea'> {/* 价格 按钮 评论框等 */}
                        <div className='orderItem_price'>{price}</div> {/* 价格 */}
                        <div> {/* 评价框 */}
                            {
                                ifCommented ? 
                                (
                                    <Button className='orderItem_button--grey' onClick={this.handleOpenEditArea}>
                                        已评价
                                    </Button>
                                ) : 
                                (
                                    <Button className='orderItem_button--red' onClick={this.handleOpenEditArea}>
                                        评价
                                    </Button>
                                )
                            }
                        </div>
                    </div> 
                </div>
                {this.state.editing ? this.renderEditArea(rate,ifCommented) : null}
            </div>
        );
    }
    renderEditArea(rate,ifCommented){
        return(
            <div className='orderItem_commentBox'> {/* 评论框 */}
                <TextArea 
                disabled={ifCommented}
                rows={4}
                onChange={this.handleCommentChange}
                value={this.state.comment}
                 />
                
                <Rate allowHalf disabled={ifCommented} value={rate} onChange={this.handleClickStars}/>
                
                <Button disabled={ifCommented} onClick={this.handleSubmitComment}>提交</Button>
                <Button onClick={this.handleCancelComment}>取消</Button>
            </div>
        );
    }
    handleClickStars = (value) =>
    {
        this.setState({ rate: value });
    }
    handleOpenEditArea = () => //评论框开关判断
    {
        this.setState(
            {editing:true,}
        );
    };
    handleCommentChange = (e) => //评论框输入
    {
        this.setState(
            {comment:e.target.value,}
        );
    };
    handleCancelComment = () => //取消按钮
    {
        this.setState(
            {
                editing:false,
                //stars:this.props.data.stars || 0,
                comment:this.props.data.comment || "",
            }
        );
    };
    handleSubmitComment = () => //提交
    {
        const {id}=this.props.data;
        const {comment,rate}=this.state;
        this.setState(
            {editing:false,}
        );
        this.props.onSubmit(id,comment,rate);
    };
    
}


export default OrderItem;
