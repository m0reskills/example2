<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Services\OrderService;
use Illuminate\Http\Response;

class CheckoutController extends Controller
{

    private $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function store(CheckoutRequest $request)
    {
        $order = $this->orderService->createOrder($request);
        $this->orderService->createOrderList($order, $request);
        $this->orderService->mailToCustomer($order);

        return response($order, Response::HTTP_CREATED);
    }
}
