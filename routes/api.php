<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/categories', 'CategoryController@getCategories');
Route::get('/categories/{category}', 'ProductController@showProductsInCategory');

//Route::get('/product', 'ProductController@getProducts');
Route::get('/sales', 'ProductController@showProductsForSale');
Route::get('/new', 'ProductController@showNewProducts');
Route::get('/new-all', 'ProductController@showAllNewProducts');
Route::get('/sales-all', 'ProductController@showAllProductsForSale');
Route::get('/product/brand/{brand}', 'ProductController@showProductsByBrand');
Route::get('/product/{product}', 'ProductController@showProductDetails');
Route::get('/product/also-like/{slug}', 'ProductController@showMayAlsoLikeProducts');

Route::get('/brands/all', 'BrandController@getBrands');

Route::get('/homepage', 'HomeController@getStaticContent');
Route::post('/checkout/store', 'CheckoutController@store');



