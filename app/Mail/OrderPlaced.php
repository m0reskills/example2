<?php

namespace App\Mail;

use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced extends Mailable
{
    use Queueable, SerializesModels;
    public $order;

    /**
     * Create a new message instance.
     *
     * @param Order $order
     */
    public function __construct (Order $order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build ()
    {
        return $this->to($this->order->email, $this->order->name)
            ->bcc('')
            ->subject('Заказ на сайте vinex-sport.ru')
            ->markdown('emails.orders.placed');
    }
}
