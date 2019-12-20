<?php


namespace App\ClassHelpers;


class ImageHelper
{
    public static function getImagesUrl($images)
    {
        if ($images) {
            foreach (json_decode($images) as $image) {
                $array[] = asset('storage/' . $image);
            }
            return $array;
        }
        return null;
    }
}
