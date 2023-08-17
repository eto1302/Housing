package com.example.Housing;

import com.example.Housing.Entities.Address;
import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.AddressRepository;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
	private static String pwd;

	public static void main(String[] args) {
		SpringApplication.run(HousingApplication.class, args);
	}

	@Bean
	CommandLineRunner init(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
		return args -> {
			generatePassword();
			populateDatabase(propertyRepository, photoRepository, addressRepository);
		};
	}

	private void generatePassword() {
		List rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 1),
				new CharacterRule(EnglishCharacterData.LowerCase, 1), new CharacterRule(EnglishCharacterData.Digit, 1),new CharacterRule(EnglishCharacterData.Special, 1));

		PasswordGenerator generator = new PasswordGenerator();
		pwd = generator.generatePassword(16, rules);
		System.out.println(pwd);
	}

	private void populateDatabase(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
		for(int i = 0; i < 100; ++i){
			addressRepository.save(new Address("testStreet 25", "Varna", "Coast", "Bulgaria", "9000", 43.20230700815063, 27.92398286015827));
			try{
				File imageFile = new File("src/main/resources/image" + (i%6) + ".jpg");
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
				Property property = new Property("Силвия Гочева",
						"Test Housing, No_" + i, "testDescription", addressRepository.findAll().get(i), 13.70,
						Date.from(LocalDate.of(2023, 6, 29).atStartOfDay(ZoneId.systemDefault()).toInstant()),
						4, "testLink", false, new HashSet<>(Arrays.asList(photos.get(i))));
				propertyRepository.save(property);
			}

		}
	}
}
