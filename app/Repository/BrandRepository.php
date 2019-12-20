<?php


namespace App\Repository;


use App\Brand;
use App\Http\Resources\BrandResource;

class BrandRepository
{
    public function getAllBrandCollection()
    {
        return BrandResource::collection($this->getAllBrands());
    }

    public function getAllBrands()
    {
        return Brand::all();
    }
}
