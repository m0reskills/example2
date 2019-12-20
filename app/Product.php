<?php

namespace App;

use App\ClassHelpers\ImageHelper;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Nicolaslopezj\Searchable\SearchableTrait;

class Product extends Model
{
    protected $fillable = [
        'quantity',
        'name'
    ];
    use SearchableTrait, Searchable;

    /**
     * Searchable rules.
     *
     * @var array
     */
    protected $searchable = [
        /**
         * Columns and their priority in search results.
         * Columns with higher values are more important.
         * Columns with equal values have equal importance.
         *
         * @var array
         */
        'columns' => [
            'product.name' => 10,
            'products.description' => 2,
        ],
    ];

    protected $with = ['modifications'];

    public function searchableAs()
    {
        return 'vinex.products';
    }

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'images' => ImageHelper::getImagesUrl($this->images),

        ];
    }

    public function scopeMayAlsoLike($query)
    {
        return $query->inRandomOrder()->take(4);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function modifications()
    {
        return $this->hasMany(Modification::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function brands()
    {
        return $this->belongsTo(Brand::class);
    }
}
