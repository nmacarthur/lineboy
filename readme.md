# ImageBoy

Imageboy takes your images and wraps them in a container that resizes nicely.

## Installation

`npm install @nmacarthur/imageboy`

## Usage

After including the file, run `imageboy()` to replace your images.

`<img data-replace src="..." alt="..." />`

The data-replace tag will place the image within the responsive container.

The default ratio is 16 / 9.

`<img data-replace data-ratio="1/1" src="..." alt="..." />`

Adding the ratio tag will set the ratio on the image container

`<img class="className" data-replace src="..." alt="..." />`

Classes that are added to the image will be placed on the parent component.
