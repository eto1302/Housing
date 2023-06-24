package com.example.Housing;

import com.example.Housing.Entities.Address;
import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.AddressRepository;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.provider.HibernateUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@SpringBootApplication
public class HousingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HousingApplication.class, args);
	}

	@Bean
	CommandLineRunner init(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
		return args -> populateDatabase(propertyRepository, photoRepository, addressRepository);
	}

	private void populateDatabase(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
		addressRepository.save(new Address("testStreet 25", "Varna", "Coast", "Bulgaria", "9000", 43.20230700815063, 27.92398286015827));
		for(int i = 0; i < 6; ++i){
			try{
				File imageFile = new File("src/main/resources/image" + i + ".jpg");
				BufferedImage image = ImageIO.read(imageFile);

				// Convert the image to byte array
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				ImageIO.write(image, "jpg", baos);
				byte[] byteArray = baos.toByteArray();

				// Close the ByteArrayOutputStream
				baos.close();
				photoRepository.save(new Photo(byteArray));
			}
			catch(IOException e){
				System.out.println(e.getMessage());
			}
			var photos = photoRepository.findAll();
			if(!photos.isEmpty()){
				Property property = new Property(
						"Test Housing, No_" + i, "testDescription", addressRepository.findAll().get(0), 13.70,
						Date.from(LocalDate.of(2023, 6, 29).atStartOfDay(ZoneId.systemDefault()).toInstant()),
						4, false, new HashSet<Photo>(Collections.singletonList(photos.get(photos.size() - 1))));
				propertyRepository.save(property);
			}

		}
	}
}
