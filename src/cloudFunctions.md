### 1. getDishOrderStatistics

#### 参数:	

restaurant ( 餐厅号，String)

interval ( 距离当前时间的间隔，单位小时，Number )

#### 返回：

该餐馆此段时间内各菜品及对应销量

JSON数组，格式：[ { **dish_id**: String, **num**: Number } ]

