#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class ConcertsController < ApplicationController
  before_action :set_concert, only: [:show, :edit, :update, :destroy]

  # GET /concerts
  # GET /concerts.json
  def index
    @concerts = Concert.all
  end

  # GET /concerts/1
  # GET /concerts/1.json
  def show
  end

  # GET /concerts/new
  def new
    @concert = Concert.new
  end

  # GET /concerts/1/edit
  def edit
  end

  # POST /concerts
  # POST /concerts.json
  def create
    @concert = Concert.new(concert_params)

    respond_to do |format|
      if @concert.save
        format.html do 
          redirect_to @concert, notice: "Concert was successfully created."
        end
        format.json { render :show, status: :created, location: @concert }
      else
        format.html { render :new }
        format.json do 
          render json: @concert.errors, status: :unprocessable_entity
        end
      end
    end
  end

  # PATCH/PUT /concerts/1
  # PATCH/PUT /concerts/1.json
  def update
    respond_to do |format|
      if @concert.update(concert_params)
        format.html do 
          redirect_to @concert, notice: "Concert was successfully updated."
        end
        format.json { render :show, status: :ok, location: @concert }
      else
        format.html { render :edit }
        format.json do 
          render json: @concert.errors, status: :unprocessable_entity
        end
      end
    end
  end

  # DELETE /concerts/1
  # DELETE /concerts/1.json
  def destroy
    @concert.destroy
    respond_to do |format|
      format.html do 
        redirect_to concerts_url, notice: "Concert was successfully destroyed."
      end
      format.json { head :no_content }
    end
  end

  private def set_concert
    @concert = Concert.find(params[:id])
  end

  private def concert_params
    params.require(:concert).permit(
        :name, :description,
        :start_time, :venue_id,
        :genre_tags, :ilk, :access)
  end
end
