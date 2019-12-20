<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'last_name',
        'email',
        'address',
        'city',
        'postcode',
        'phone',
        'delivery',
        'comments',
        'cart_total',
        'status',
    ];
    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function products ()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity');
    }
}
