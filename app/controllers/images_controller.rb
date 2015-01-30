class ImagesController < ApplicationController
  def index
    @image = Image.new
    @images = Image.all
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    render json: @image
  end

  def update
    @image = Image.find(params[:id])
    @image.likes += 1
    @image.save
    render json: @image
  end

  private
  def image_params
    params.require(:image).permit(:title, :url, :username)
  end

end
