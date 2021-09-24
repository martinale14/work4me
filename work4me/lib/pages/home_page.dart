import 'package:flutter/material.dart';
import 'package:work4me/components/button.dart';
import 'package:work4me/components/input.dart';
import 'package:work4me/components/raised_button.dart';

class MyHomePage extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  MyHomePage({Key? key}) : super(key: key) {
    emailController.addListener(() {
      final String text = emailController.text.toLowerCase();
      emailController.value = emailController.value.copyWith(
        text: text,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return (Scaffold(
      backgroundColor: const Color(0xFF111111),
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: Container(
          padding: const EdgeInsets.only(top: 100.0),
          height: MediaQuery.of(context).size.height,
          width: MediaQuery.of(context).size.width,
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Image.asset('assets/logo.png'),
                const SizedBox(
                  height: 20.0,
                ),
                Container(
                    alignment: Alignment.centerLeft,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 50, vertical: 15),
                    child: const Text(
                      'Sign in',
                      style: TextStyle(fontSize: 32, color: Colors.white),
                    )),
                Input(
                  label: 'Email addres',
                  textController: emailController,
                  inputType: TextInputType.emailAddress,
                ),
                Input(
                  label: 'Password',
                  textController: passwordController,
                  inputType: TextInputType.text,
                  obscure: true,
                ),
                const SizedBox(
                  height: 40.0,
                ),
                const Button(
                  text: 'Sign in',
                ),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.12,
                ),
                const Text(
                  'Do you have an account?',
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
                const RaisedButtonFlat(text: 'Tap here')
              ],
            ),
          ),
        ),
      ),
    ));
  }
}
