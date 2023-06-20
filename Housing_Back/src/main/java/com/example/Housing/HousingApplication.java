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
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;

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
		try{
			File imageFile = new File("src/main/resources/arc_reactor.jpg");
			BufferedImage image = ImageIO.read(imageFile);

			// Convert the image to byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			ImageIO.write(image, "jpg", baos);
			byte[] byteArray = baos.toByteArray();

			// Do something with the byte array

			// Close the ByteArrayOutputStream
			baos.close();
			photoRepository.save(new Photo(byteArray));
		}
		catch(IOException e){
			System.out.println(e.getMessage());
		}
		if(!photoRepository.findAll().isEmpty()){
			propertyRepository.save(new Property(
					"testName", "testDescription", addressRepository.findAll().get(0), 13.70,
					new Date(2023, 6, 29), 4, false, Collections.singletonList(photoRepository.findAll().get(0))));
		}
	}
}
