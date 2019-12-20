<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modification extends Model
{
    protected $fillable = [
        'product_id',
        'code',
        'color',
        'size',
        'price',
        'old_price',
        'created_at',
        'updated_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getPriceAttribute($value)
    {
        return ceil($value * Rate::currentRate());
    }

    public function getOldPriceAttribute($value)
    {
        return ceil($value * Rate::currentRate());
    }
}
