<?php


namespace App\Services;


use App\Mail\OrderPlaced;
use App\Order;
use App\OrderProduct;
use Illuminate\Support\Facades\Mail;

class OrderService
{
    public function createOrder($request)
    {
        return Order::create([
            'user_id' => null,
            'name' => $request->orderInfo['name'],
            'last_name' => $request->orderInfo['lastName'],
            'email' => $request->orderInfo['email'],
            'address' => $request->orderInfo['address'],
            'city' => $request->orderInfo['city'],
            'postcode' => $request->orderInfo['postcode'],
            'phone' => $request->orderInfo['phone'],
            'delivery' => $request->orderInfo['delivery'] ? 1 : 0,
            'delivery_info' => $request->orderInfo['comments'],
            'cart_total' => $request->orderInfo['cart_total']
        ]);
    }

    public function createOrderList($order, $request)
    {
        foreach ($request->modifications as $modification) {
            OrderProduct::create([
                'order_id' => $order->id,
                'product_id' => $modification['product_id'],
                'modification_id' => $modification['id'],
                'quantity' => $modification['quantity'],
                'price' => $modification['price'],
            ]);
        }
    }
    public function mailToCustomer($order): void
    {
        Mail::send(new OrderPlaced($order));
    }
}
