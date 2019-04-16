class ChangeGithubUrlToUrl < ActiveRecord::Migration[5.2]
  def change
    add_column :assignment_submissions, :url, :string
    remove_column :assignment_submissions, :github_url, :string
  end
end
