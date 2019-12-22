#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class TicketsController < ApplicationController
  before_action :set_ticket, only: [:show, :edit, :update, :destroy]

  # GET /tickets
  # GET /tickets.json
  def index
    @tickets = Ticket.all
  end

  # GET /tickets/1
  # GET /tickets/1.json
  def show
  end

  # GET /tickets/new
  def new
    @ticket = Ticket.new
  end

  # GET /tickets/1/edit
  def edit
  end

  # POST /tickets
  # POST /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)

    respond_to do |format|
      if @ticket.save
        format.html do 
          redirect_to @ticket, notice: "Ticket was successfully created."
        end
        format.json { render :show, status: :created, location: @ticket }
      else
        format.html { render :new }
        format.json do 
          render json: @ticket.errors, status: :unprocessable_entity
        end
      end
    end
  end

  # PATCH/PUT /tickets/1
  # PATCH/PUT /tickets/1.json
  def update
    respond_to do |format|
      if @ticket.update(ticket_params)
        format.html do 
          redirect_to @ticket, notice: "Ticket was successfully updated."
        end
        format.json { render :show, status: :ok, location: @ticket }
      else
        format.html { render :edit }
        format.json do 
          render json: @ticket.errors, status: :unprocessable_entity
        end
      end
    end
  end

  # DELETE /tickets/1
  # DELETE /tickets/1.json
  def destroy
    @ticket.destroy
    respond_to do |format|
      format.html do 
        redirect_to tickets_url, notice: "Ticket was successfully destroyed."
      end
      format.json { head :no_content }
    end
  end



  private def set_ticket
    @ticket = Ticket.find(params[:id])
  end

  private def ticket_params
    params.require(:ticket).permit(:gig_id, :row, :number, :user_id)
  end
end
