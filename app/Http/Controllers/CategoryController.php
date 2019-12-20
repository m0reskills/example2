<?php

namespace App\Http\Controllers;

use App\Repository\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class CategoryController extends Controller
{

    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getCategories (): Collection
    {
        return $this->categoryRepository->getAllCategories();
    }
}
