<?php

namespace App\Http\Controllers;

use App\Repository\BrandRepository;

class BrandController extends Controller
{

    private $brandRepository;

    public function __construct(BrandRepository $brandRepository)
    {
        $this->brandRepository = $brandRepository;
    }

    public function getBrands ()
    {
        return $this->brandRepository->getAllBrandCollection();
    }
}
