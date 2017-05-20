Rails.application.routes.draw do
  root to: "dashboard#index"
  devise_for :teachers
  resources :teachers
  resources :lessons, only: [:index, :show, :create]
  get :dashboard, controller: :dashboard, action: :index
end
