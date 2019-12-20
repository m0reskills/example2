<?php

namespace App\Http\Resources;

use App\ClassHelpers\ImageHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'product_id' => $this->id,
            'slug' => $this->slug,
            'modifications' => $this->modifications,
            'modification_count' => $this->modifications->count(),
            'name' => $this->name,
            'material' => $this->material,
            'dimensions' => $this->dimensions,
            'description' => $this->description,
            'images' => $this->images,
            'image_alt' => $this->image_alt,
            'meta_description' => $this->meta_description,
            'meta_keywords' => $this->meta_keywords,
        ];
    }
}
