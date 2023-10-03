data "azurerm_client_config" "current" {}
output "tenant_id" {
  value = data.azurerm_client_config.current.tenant_id
}


# Configure Terraform
terraform {
  required_providers {
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.15.0"
    }
  }
}

# Configure the Azure Active Directory Provider
provider "azuread" {
  tenant_id = data.azurerm_client_config.current.tenant_id
}

resource "azuread_application" "login_integration" {
  display_name = "enterprisetraveldiaries"
  web {
    redirect_uris = ["https://your-spa-url/"]
  }
}

output "client_id" {
  value = azuread_application.login_integration.application_id
}



