Rails.application.routes.draw do
  resources :lessons
  devise_for :teachers
  resources :teachers
  root to: "dashboard#index"
end
