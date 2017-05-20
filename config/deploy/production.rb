server '54.178.170.122', port: 22, roles: [:app, :web, :db], primary: true

set :ssh_options, { keys: %w(~/.ssh/rails-app.pem), forward_agent: true, user: fetch(:user) }
