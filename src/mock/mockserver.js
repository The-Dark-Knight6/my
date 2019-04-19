// 使用mockjs来模拟数据, 提供mock数据API接口
import Mock from 'mockjs'
import data from './data.json'
//注册接口
Mock.mock('/api2/seller',{
    code : 0,
    data : data.seller
})
Mock.mock('/api2/goods',{
    code : 0,
    data : data.goods
})
Mock.mock('/api2/ratings',{
    code : 0,
    data : data.ratings
})