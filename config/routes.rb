Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'

  resources :users,      only: [:edit, :update] do
    collection do
      get  :search
    end
  end
  resources :groups,     only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
end
