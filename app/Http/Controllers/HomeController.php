<?php

namespace App\Http\Controllers;

use App\Brand;
use App\Category;
use App\Http\Resources\BrandResource;
use App\Http\Resources\HomepageResouce;
use App\Repositories\MetaRepository;
use App\Repository\BrandRepository;
use App\Repository\CategoryRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    private $brandRepository;
    private $categoryRepository;

    public function __construct(
        BrandRepository $brandRepository,
        CategoryRepository $categoryRepository)
    {
        $this->brandRepository = $brandRepository;
        $this->categoryRepository = $categoryRepository;
    }

    public function getStaticContent(): Array
    {
        $meta = new MetaRepository(
            setting('site.title'),
            setting('site.description'),
            setting('site.keywords'));
        return [
            'allBrands' => BrandResource::collection($this->brandRepository->getAllBrands()),
            'categories' => $this->categoryRepository->getAllCategories(),
            'meta' => [
                'keywords' => $meta->keywords,
                'description' => $meta->description,
                'title' => $meta->title
            ]
        ];
    }
}
