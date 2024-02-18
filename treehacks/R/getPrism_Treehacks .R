    ### Import and activate needed packages ###
    
    ipak <- function(pkg){
      new.pkg <- pkg[!(pkg %in% installed.packages()[, "Package"])]
      if (length(new.pkg)) 
        install.packages(new.pkg, dependencies = TRUE)
      sapply(pkg, require, character.only = TRUE)
    }
    
    packages <- c('rpostgis','sf','ggspatial','prism','ggplot2','terra','stars', 'RPostgreSQL',
                  'lubridate', 'DBI', 'RSQLite')
    
    ### More packages may be added to the previous vector as needed ###
    
    ipak(packages)
    
  
    # Make a connection to the database

    # con <- RPostgres::dbConnect(RPostgres::Postgres(),
    #                             dbname = 'postgres', host = 'localhost',
    #                             user = 'postgres', password = '1111')
    
    mydb <- dbConnect(RSQLite::SQLite(), "neat")
    
    # Make destination directory
    dir.create('prism')
    
    # Set that folder as the PRISM destination
    options(prism.path = "prism")
    
    #Get Precip data 
    get_prism_monthlys(type = 'ppt', years = 2020:2022, mon = 1:12,
                       #minDate = '2020-01-01',maxDate = '2022-04-01',
                       keepZip = FALSE)
    
    
    files <- list.files('prism', recursive = T)
    head(files)
    
    files <- files[substr(files,nchar(files)-3,nchar(files)) == '.bil']  
    head(files)
    
    head(strsplit(files,'/'))
    head(unlist(strsplit(files,'/')))
    
    files <- data.frame(path = unlist(strsplit(files,'/'))[1:length(files) %% 2 == 1],
                        file = unlist(strsplit(files,'/'))[1:length(files) %% 2 == 0]) 
    head(files)
    
    
    files$access_date <- Sys.time()
    paste(files$file[1])    
    
    # Write to PostGreSQL
    #dbWriteDataFrame(con, name = 'prism', df = files)
    dbWriteTable(mydb, name = 'prism',files, overwrite= T)
    
    
    
    # Inital Query
    query <- paste('SELECT path, file',
                   'FROM prism',
                   'WHERE file LIKE \'%ppt%\'')
    
    rainRasts <- dbGetQuery(mydb, query)[1:34,]
    
    # I need to remove provisional bils
    rainRasts <- dbGetQuery(mydb, query)[7:34,]
    
    
    # Initialize SpatRaster for January 2020
    rJan <- rast(paste('prism',
                       rainRasts[1,1],
                       rainRasts[1,2],sep = '/'))
    
    # Add subsequent files
    for(i in 2:nrow(rainRasts)){
      add(rJan) <- rast(paste('prism',
                              rainRasts[i,1],
                              rainRasts[i,2],sep = '/'))
    }
    
    plot(rJan)
    
    
    
    # CROP AREA TO BB 
    #BB<- st_read('/Volumes/big_game/Erin_OConnell/BB.shp')
    BB<- st_read('/Users/test/Downloads/rb_aoi/rb_aoi.shp')
    RB.JAN <- crop(rJan, BB)
    plot(RB.JAN)
    
    
    # WRITE cropped files to db
    terra::writeRaster(RB.JAN, "prism/RB.tif", filetype = "GTiff", overwrite = TRUE)
    sapply(paste0("file", 1:28, ".bil"), unlink) #should be 28 monthly composites of prec data
    
    
    ### P4: TIME-SERIES
    
    # Get the sums of the absolute values for each day
    cumDelta <- colSums(abs(terra::values(RB.JAN)),na.rm = T)
    
    # Get the dates
    dates <- substr(names(RB.JAN),24,29)
    dates <- paste(dates, "01", sep="") # it get ymd 
    dates <- lubridate::as_date(dates)
    
    # Plot that stuff
    plot(dates, cumDelta, type = 'l',
         main = 'Rocker b Ranch Total Rainfall \n 2020-2022',
         ylab = 'Cumulative Flux (C)', xlab = 'Day')
    
    ggplot()+ aes(x= dates, y= cumDelta) +
      geom_line( color = "blue", size=1.2) +
      xlab(paste0('Date')) +
      ylab(paste0('Total Precipitation')) +
      ggtitle(label = "Total Rainfall at the Rocker b Ranch") +
      theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1)) +
      theme(axis.text = element_text(family = 'Times New Roman',size = 12, color = 'Black')) +
      theme(plot.title = element_text(hjust = 0.5)) +
      scale_x_date(date_breaks = "2 months") 
    
    
