<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Category;
use App\Http\Resources\ProductResource;
use App\Product;
use App\Repository\ProductRepository;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    private $productRepository;
    const PRODUCTS_QUANTITY = 4;
    const PRODUCTS_PAGINATION = 10;
    const SALE_PRODUCTS = 'sale';
    const NEW_PRODUCTS = 'new';

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function showProductsForSale (): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository
            ->getFixedProducts(self::SALE_PRODUCTS, self::PRODUCTS_QUANTITY));
    }

    public function showAllProductsForSale (): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository
            ->getProducts(self::SALE_PRODUCTS, self::PRODUCTS_PAGINATION));
    }

    public function showNewProducts (): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository
            ->getFixedProducts(self::NEW_PRODUCTS, self::PRODUCTS_QUANTITY));
    }

    public function showAllNewProducts (): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository
            ->getProducts(self::NEW_PRODUCTS, self::PRODUCTS_PAGINATION));
    }

    public function showMayAlsoLikeProducts (string $slug): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository->mayAlsoLikeProducts($slug));
    }

    public function showProductsByBrand (Brand $brand): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository
            ->getProductsByBrand($brand, self::PRODUCTS_PAGINATION));
    }

    public function showProductDetails (Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    public function showProductsInCategory(Category $category): AnonymousResourceCollection
    {
        return ProductResource::collection($this->productRepository
            ->getProductsByCategory($category, self::PRODUCTS_PAGINATION));
    }
}
