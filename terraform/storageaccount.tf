

resource "azurerm_storage_account" "travel_diaries_storage_acc" {
  name                     = "azurestorageslider5354"
  resource_group_name      = azurerm_resource_group.travel_diaries_rg.name
  location                 = azurerm_resource_group.travel_diaries_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  enable_https_traffic_only = false
 blob_properties{
  cors_rule {
    allowed_headers    = ["*"]
    allowed_methods    = ["GET", "POST", "PUT", "DELETE"]
    allowed_origins    = ["*"]
    exposed_headers     = ["*"]
    max_age_in_seconds = 3600
  }
 }
}


data "azurerm_storage_account_sas" "travel_diaries_storage_acc_sas" {
  connection_string = azurerm_storage_account.travel_diaries_storage_acc.primary_connection_string

  resource_types {
    service   = true
    container = false
    object    = false
  }

  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }

  start          = "2023-10-01T00:00:00Z"
  expiry     = "2024-10-31T00:00:00Z"

  permissions {
    read    = true
    add     = true
    create  = true
    write   = true
    delete  = true
    list    = true
    update  = false
    process = false
    tag     = false
    filter  = false
  }
}

output "storage_account_sas" {
  value = data.azurerm_storage_account_sas.travel_diaries_storage_acc_sas.sas
  sensitive   = true
}