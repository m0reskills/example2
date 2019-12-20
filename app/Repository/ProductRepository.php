<?php


namespace App\Repository;

use App\Brand;
use App\Category;
use App\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository
{

    public function getProductsByCategory(Category $category, int $pagination): LengthAwarePaginator
    {
        return $category
            ->products()
            ->paginate($pagination);
    }

    public function getProductsByBrand(Brand $brand, int $pagination): LengthAwarePaginator
    {
        return $brand
            ->products()
            ->where('active', true)
            ->paginate($pagination);
    }

    public function getFixedProducts(string $typeOfProduct, int $quantity): Collection
    {
        return Product::where([$typeOfProduct => true, 'active' => true])
            ->take($quantity)
            ->get();
    }

    public function getProducts(string $typeOfProduct, int $pagination): LengthAwarePaginator
    {
        return Product::where([$typeOfProduct => true, 'active' => true])
            ->paginate($pagination);
    }

    public function mayAlsoLikeProducts(string $slug): Collection
    {
        return Product::where('slug', '!=', $slug)
            ->mayAlsoLike()
            ->get();
    }
}
