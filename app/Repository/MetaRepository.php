<?php


namespace App\Repositories;

class MetaRepository
{
    public $title;
    public $keywords;
    public $description;

    public function __construct($title, $description, $keywords)
    {
        $this->title = $title;
        $this->description = $description;
        $this->keywords = $keywords;
    }
}
